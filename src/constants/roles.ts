export enum UserRoleId {
    AdminRoleId = 1,
    OwnerRoleId = 2,
    StaffRoleId = 3,
    CustomerRoleId = 4,
    AccountantRoleId = 5,
    CustomerServiceRoleId = 6,
    HumanResourceRoleId = 7,
    ContributorRoleId = 8
}

export enum UserRoleCode {
    AdminRoleId = "admin",
    OwnerRoleId = "owner",
    StaffRoleId = "staff",
    CustomerRoleId = "customer",
    AccountantRoleId = "accountant",
    CustomerServiceRoleId = "customerService",
    HumanResourceRoleId = "humanResource",
    ContributorRoleId = "contributor"
}

export const MapRoleIdToCode = new Map<number, string> ([
    [UserRoleId.AdminRoleId, UserRoleCode.AdminRoleId],
    [UserRoleId.OwnerRoleId, UserRoleCode.OwnerRoleId],
    [UserRoleId.StaffRoleId, UserRoleCode.StaffRoleId],
    [UserRoleId.CustomerRoleId, UserRoleCode.CustomerRoleId],
    [UserRoleId.AccountantRoleId, UserRoleCode.AccountantRoleId],
    [UserRoleId.CustomerServiceRoleId, UserRoleCode.CustomerServiceRoleId],
    [UserRoleId.HumanResourceRoleId, UserRoleCode.HumanResourceRoleId],
    [UserRoleId.ContributorRoleId, UserRoleCode.ContributorRoleId],
]);