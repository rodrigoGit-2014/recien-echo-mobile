export function clusterPins(pins, threshold = 6.5) {
  const used = new Set();
  const groups = [];
  pins.forEach((p) => {
    if (used.has(p.id)) return;
    const group = [p];
    used.add(p.id);
    pins.forEach((q) => {
      if (used.has(q.id)) return;
      const dx = p.x - q.x, dy = p.y - q.y;
      if (Math.sqrt(dx * dx + dy * dy) < threshold) {
        group.push(q);
        used.add(q.id);
      }
    });
    groups.push(group);
  });
  return groups;
}
