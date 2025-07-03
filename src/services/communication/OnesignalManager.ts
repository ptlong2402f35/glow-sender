import Config from "../../config/Config";
import OneSignal from "@onesignal/node-onesignal"
import util from "util";

const OnesignalConfig = Config.onesignal;

export default class OnesignalManager {
    constructor() {}

    public async pushMobileNotification(userIds: number[], content: string, title: string, data?: any, foreignContent?: any) {
        const app_key_provider = {
			getToken() {
				return OnesignalConfig.ONESIGNAL_REST_API_KEY;
			},
		};

        const configuration = OneSignal.createConfiguration({
			authMethods: {
				app_key: {
					tokenProvider: app_key_provider,
				},
			},
		});

        var include_external_user_ids = [];
		if (Array.isArray(userIds)) {
			include_external_user_ids = userIds.map(el => String(el));
		} else {
			include_external_user_ids.push(String(userIds));
		}
		const client = new OneSignal.DefaultApi(configuration);
		const notification = new OneSignal.Notification();
		notification.app_id = OnesignalConfig.ONESIGNAL_APP_ID;
		notification.include_external_user_ids = include_external_user_ids;
		notification.data = data;
		notification.ios_sound = "custom_sound.wav";
		notification.android_channel_id = OnesignalConfig.ANDROID_APP_ID;
		notification.contents = foreignContent ? foreignContent : {
			en: content,
		};
		if(title) {
			notification.headings = {
				en: title,
			};
		}

        const res = await client.createNotification(notification);
		console.log(`==== Onesignal send result: `, util.inspect(res, false, null, true));
		return res.id ? "DONE" : "ERROR";
    }
}