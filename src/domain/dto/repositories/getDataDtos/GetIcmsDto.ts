export abstract class GetIcmsDTO {
  id?: string;
  stateRelationIcms?: StateRelationIcmsDTO;
}

export abstract class StateRelationIcmsDTO {
  state_origin: string;
  recipient_state: string;
}
