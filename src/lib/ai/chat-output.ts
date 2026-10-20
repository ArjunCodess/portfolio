export async function* lowercaseProse(input: AsyncIterable<string>) {
  let pending = "";
  for await (const delta of input) {
    pending += delta;
    while (pending) {
      const url = pending.search(/https?:\/\//i);
      if (url < 0) {
        // hold only a possible url prefix split across chunks.
        let keep = 0;
        for (let length = 1; length <= Math.min(7, pending.length); length++) {
          const suffix = pending.slice(-length).toLowerCase();
          if (
            ["https://", "http://"].some((prefix) => prefix.startsWith(suffix))
          )
            keep = length;
        }
        const ready = pending.slice(0, pending.length - keep);
        if (ready) yield ready.toLowerCase();
        pending = pending.slice(pending.length - keep);
        break;
      }
      if (url > 0) {
        yield pending.slice(0, url).toLowerCase();
        pending = pending.slice(url);
      }
      const end = pending.search(/[\s<>"\])]/);
      if (end < 0) break;
      yield pending.slice(0, end);
      pending = pending.slice(end);
    }
  }
  if (pending)
    yield /^https?:\/\//i.test(pending) ? pending : pending.toLowerCase();
}
