
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, VirtualDataType, VirtualDataTypeConstructor, DataTypes, NonAttribute } from 'sequelize';
import { Json } from 'sequelize/lib/utils';
import { MapRoleIdToCode } from "../constants/roles";
const PROTECTED_ATTRIBUTES = ["password", "tokens"];

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare userName: string;
    declare email: string;
    declare password: string;
    declare urlImage?: string;
    declare tokens?: Json;
    declare roleId: number;
    declare active: boolean;
    declare phone: string;
    declare numberFailedLogin: number;
    declare lockedAt: Date;
    declare totalMoney: number;
    declare isBanned: boolean;
    declare pendingOrderCount: number;
    declare lastPendingOrderAt: Date;
    declare userCoordinate: { type: 'Point'; coordinates: [number, number] };
    declare locationUpdatedAt: Date;
    declare storeRoles: number[];
    declare ownStoreId: number;
    declare staffType: number;
    declare storeId: number;
    declare refFromUserId: number;
    declare timeDiscount: number;
    declare referExpiredAt: Date;
    declare promoCode: string;
    declare promoLink: string;
    declare refCode: string;
    declare unlimitTimeDiscount: boolean;
    declare unExpiredRefer: boolean;
    declare gender: number;
    declare countryId: number;
    declare referAppliedAt: Date;
    declare referVersion: number;
    declare detailLink: string;
    declare detailLinkCheck: string;
    declare hasDoneOrder: boolean;
    declare lang: string;
    declare punishmentType: number;
    declare premiumType: number;
    declare orderConnectedCount: number;
    declare orderMaturedAt: Date;
    declare periodCancelRate: number;
    declare orderEventData: Record<string, any>;
    declare orderCancelRate: number;
    declare eventUpdatedAt: Date;
    declare unactiveByAdmin: boolean;
    declare thumbnailImage: string;
    declare chatBoxUpdatedAt: Date;
    declare unreadMessageCount: number;
    declare version: string;
    declare doneOrderCount: number;
    declare uid: string | null;
    declare purchasePermission: number[];
    declare haveVipPermission: boolean;
    declare vipExpiredAt: Date;
    declare vipRenewable: boolean;
    declare vipPurchaseAt: Date;
    declare totalGlowCoin: number;
    declare spaPriceConsumeIds: number[];

    get roleCode(): NonAttribute<string | undefined | null> {
        return this.roleId ? MapRoleIdToCode.get(this.roleId) : null;
    }

    toJSON() {
        const attributes: Record<string, any> = { ...this.get() };
        for (const key of PROTECTED_ATTRIBUTES) {
            delete attributes[key];
        }
        return attributes;
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        urlImage: {
            type: DataTypes.STRING,
        },
        tokens: {
            type: DataTypes.JSON,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        phone: {
            type: DataTypes.STRING,
        },
        numberFailedLogin: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        lockedAt: {
            type: DataTypes.DATE,
        },
        totalMoney: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        pendingOrderCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        lastPendingOrderAt: {
            type: DataTypes.DATE,
        },
        userCoordinate: {
            type: DataTypes.GEOMETRY('POINT'),
        },
        locationUpdatedAt: {
            type: DataTypes.DATE,
        },
        storeRoles: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        ownStoreId: {
            type: DataTypes.INTEGER,
        },
        staffType: {
            type: DataTypes.INTEGER,
        },
        storeId: {
            type: DataTypes.INTEGER,
        },
        refFromUserId: {
            type: DataTypes.INTEGER,
        },
        timeDiscount: {
            type: DataTypes.INTEGER,
        },
        referExpiredAt: {
            type: DataTypes.DATE,
        },
        promoCode: {
            type: DataTypes.STRING,
        },
        promoLink: {
            type: DataTypes.STRING,
        },
        refCode: {
            type: DataTypes.STRING,
        },
        unlimitTimeDiscount: {
            type: DataTypes.BOOLEAN,
        },
        unExpiredRefer: {
            type: DataTypes.BOOLEAN,
        },
        gender: {
            type: DataTypes.INTEGER,
        },
        countryId: {
            type: DataTypes.INTEGER,
        },
        referAppliedAt: {
            type: DataTypes.DATE,
        },
        referVersion: {
            type: DataTypes.INTEGER,
        },
        detailLink: {
            type: DataTypes.STRING,
        },
        detailLinkCheck: {
            type: DataTypes.STRING,
        },
        hasDoneOrder: {
            type: DataTypes.BOOLEAN,
        },
        lang: {
            type: DataTypes.STRING,
        },
        punishmentType: {
            type: DataTypes.INTEGER,
        },
        premiumType: {
            type: DataTypes.INTEGER,
        },
        orderConnectedCount: {
            type: DataTypes.INTEGER,
        },
        orderMaturedAt: {
            type: DataTypes.DATE,
        },
        periodCancelRate: {
            type: DataTypes.FLOAT,
        },
        orderEventData: {
            type: DataTypes.JSON,
        },
        orderCancelRate: {
            type: DataTypes.FLOAT,
        },
        eventUpdatedAt: {
            type: DataTypes.DATE,
        },
        unactiveByAdmin: {
            type: DataTypes.BOOLEAN,
        },
        thumbnailImage: {
            type: DataTypes.STRING,
        },
        chatBoxUpdatedAt: {
            type: DataTypes.DATE,
        },
        unreadMessageCount: {
            type: DataTypes.INTEGER,
        },
        version: {
            type: DataTypes.STRING,
        },
        doneOrderCount: {
            type: DataTypes.INTEGER,
        },
        uid: {
            type: DataTypes.STRING,
        },
        purchasePermission: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        haveVipPermission: {
            type: DataTypes.BOOLEAN,
        },
        vipExpiredAt: {
            type: DataTypes.DATE,
        },
        vipRenewable: {
            type: DataTypes.BOOLEAN,
        },
        vipPurchaseAt: {
            type: DataTypes.DATE,
        },
        totalGlowCoin: {
            type: DataTypes.FLOAT,
        },
        spaPriceConsumeIds: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
    },
    {
        tableName: 'Users',
        sequelize,
        timestamps: false,
    }
)