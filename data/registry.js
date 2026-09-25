// 年度データの登録。新しい年度を追加したら、対応する <script src="data/xxx.js"> を
// index.html に追加し、ここに配列要素を追加する。
const ALL_YEAR_DATA = [
  DATA_R08,
  DATA_R07,
  DATA_R06,
  DATA_R05,
  DATA_R05S,
  DATA_R04,
  DATA_R03,
  DATA_R02,
  DATA_R01,
  DATA_H30,
  DATA_H29,
  DATA_H28
];

const CATEGORY_LABELS = {
  bookkeeping: "簿記・仕訳",
  statements: "財務諸表・企業会計",
  cost: "原価計算・管理会計",
  analysis: "経営分析",
  finance: "ファイナンス"
};
