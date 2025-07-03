import OnesignalManager from "../../../../services/communication/OnesignalManager";
const EntriesUserPerOneSignal = process.env.ENTRIES_USER_PER_ONE_SIGNAL ? parseInt(process.env.ENTRIES_USER_PER_ONE_SIGNAL) : 2000;
export default class CommunicationService {
    onesignalManager: OnesignalManager;
    constructor() {
        this.onesignalManager = new OnesignalManager();
    }

    public async pushSingleNoti(userId: number, content: string, title: string, data?: any, foreignContent?: any) {
        return await this.onesignalManager.pushMobileNotification([userId], content, title, data, foreignContent);
    }

    public async sendRemoteNotifyBatch(userIds: number[], content: string, title: string, data?: any, foreignContent?: any) {
		let retEntries: any[] = [];
		userIds.forEach((el, index) => {
			let chunk = Math.floor(index / EntriesUserPerOneSignal);
			if (!retEntries?.[chunk]) {
				retEntries[chunk] = [];
			}
			retEntries[chunk]?.push(el);
		});
		for (let entryUserIds of retEntries) {
			await this.onesignalManager.pushMobileNotification(entryUserIds, content, data, title, foreignContent);
		}
	}
}