export interface PrefillFormData {
  external_id: string;
  name: string;
  address_line_1: string;
  address_city: string;
  address_state: string;
  address_postal_code: string;
  tin: string;
  applicant_first_name: string;
  applicant_last_name: string;
  applicant_email: string;
  applicant_subrole_code: string;
  generate_invite_link: boolean;
  is_simple_flow: boolean;
}
