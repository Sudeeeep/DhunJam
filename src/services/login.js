import axios from "axios";

export async function login(credentials) {
  const {
    data: { data },
  } = await axios.post(
    "https://stg.dhunjam.in/account/admin/login",
    credentials
  );

  return data;
}
