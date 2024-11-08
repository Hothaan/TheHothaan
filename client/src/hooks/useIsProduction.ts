export default function useIsProduction() {
  function getIsProcduction(): boolean {
    if (window.location.host === "localhost:3000") {
      return false;
    } else if (window.location.host === "dolllpitoxic3.mycafe24.com") {
      return true;
    } else {
      return false;
    }
  }

  const isProduction = getIsProcduction();

  return { isProduction };
}
