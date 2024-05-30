//subpoena model
export interface Subpoena_Request{
    adaPayrollNumber: string;
    badgeNumber: string;
    chargeDescription: string;
    courtRoomNumber: string;
    dcNumber: string;
    defName: string;
    hasPmdHit: boolean;
    hearingTypeCode: string;
    isCancelled: boolean;
    isPmdApproved: boolean;
    isSent: boolean;
    listingDate: string;
    pidNumber: string;
    pmdBatchId: string;
    poName: string;
    poPayrollNumber: string;
    policeWitnessId: number;
    requestComments: string;
    requestDate: string;
    reviewedByPayroll: string;
    reviewedDate: string;
    subpoenaRequestId: string;
    trialInProgress: boolean;
    unitId:string;
}