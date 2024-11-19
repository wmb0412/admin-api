export function sleep(delay) {
  const starTime = new Date().getTime();
  while (new Date().getTime() < starTime + delay) {}
}
