import natural from "natural";

export function cosineSim(a = [], b = []) {
  const set = new Set([...a, ...b]);
  const av = [], bv = [];
  for (const x of set) {
    av.push(a.includes(x) ? 1 : 0);
    bv.push(b.includes(x) ? 1 : 0);
  }
  const dot = av.reduce((acc, v, i) => acc + v * bv[i], 0);
  const na = Math.sqrt(av.reduce((acc, v) => acc + v * v, 0));
  const nb = Math.sqrt(bv.reduce((acc, v) => acc + v * v, 0));
  const sim = na && nb ? dot / (na * nb) : 0;
  return Math.round(sim * 100);
}

export function tfidfSimilarity(docA, docB) {
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(docA || "");
  tfidf.addDocument(docB || "");
  const vocab = new Set();
  tfidf.listTerms(0).forEach(t => vocab.add(t.term));
  tfidf.listTerms(1).forEach(t => vocab.add(t.term));
  const vA = [], vB = [];
  for (const term of vocab) {
    vA.push(tfidf.tfidf(term, 0));
    vB.push(tfidf.tfidf(term, 1));
  }
  const dot = vA.reduce((acc, v, i) => acc + v * vB[i], 0);
  const na = Math.sqrt(vA.reduce((acc, v) => acc + v * v, 0));
  const nb = Math.sqrt(vB.reduce((acc, v) => acc + v * v, 0));
  const sim = na && nb ? dot / (na * nb) : 0;
  return Math.round(sim * 100);
}
