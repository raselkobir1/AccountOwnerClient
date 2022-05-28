import {Account} from './account.model';
export interface Owner{
    id: string;
    name: string;
    dateOfBirth: Date;
    address: string;

    accounts?: Account[];
}




/***************************ng Command**************** 
 * component create
 * ng g component owner/owner-list --skip-tests
 * 
 * service create
 * ng g service shared/services/error-handler --skip-tests
 * 
 * Module create
 * ng g module owner --routing=true --module app.module
 * 
 * 
*/