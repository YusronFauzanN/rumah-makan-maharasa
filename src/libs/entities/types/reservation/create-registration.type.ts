export type TCreateReservationRequest = {
  name: string;
  email: string;
  phone_number: string;
  reservation_date: string;
  reservation_time: string;
  number_of_people: number;
  desc?: string;
  desk_id: number;
};
