'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION public.trigger_user_create_proc() RETURNS trigger
    LANGUAGE plpgsql
AS $$
DECLARE
    payload TEXT := '';
BEGIN
    IF (TG_OP = 'INSERT') THEN
        select string_agg(
            'id:' || new_t."id" || ';'
                || 'phone:' || new_t."phone" || ';'
                || 'roleId:' || new_t."roleId" ,
            '|'
        ) into payload
        from new_t;
    END IF;

    PERFORM pg_notify(
        'user-event-regist',
        '"' || payload || '"'
    );
    
    RETURN NULL;
END;
$$;
      `);

      await queryInterface.sequelize.query(`
        CREATE TRIGGER trigger_user_create
        AFTER INSERT ON public."Users"
        REFERENCING NEW TABLE AS new_t
        FOR EACH STATEMENT
        EXECUTE FUNCTION public.trigger_user_create_proc();
        `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
