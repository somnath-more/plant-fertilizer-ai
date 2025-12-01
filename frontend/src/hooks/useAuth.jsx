export default function useAuth() {
  const token = localStorage.getItem("token");
  return Boolean(token); // true or false
}
