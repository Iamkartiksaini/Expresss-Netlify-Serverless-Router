export default function GenerateResponse({ body, header = {}, other = {} }) {
  const str = JSON.stringify(body);
  return new Response(str, {
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
    ...other,
  });
}
