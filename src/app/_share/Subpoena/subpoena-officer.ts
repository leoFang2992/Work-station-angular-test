//police model
export interface Subpoena_officer{
    payrollNumber:string;
    badgeNumber:string;
    createBy:string;
    createDate:string;
    dcNumber:string;
    defName:string;
    isActive:boolean;
    parsDefendant_id:string;
    pidNumber:string;
    // pmd_level:number;
    poName:string;
    policeCharge:string;
    policeWitness_id:string;
    //required
    hearingTypeCode:string;
    remarks:string;
    //make it empty for other part.
    deptName:string;
    isSelected:boolean;
    trialInProgress:boolean;
    isCancelled:boolean;
    isNew:boolean;
}