# general_knapsack
ナップサック問題を遺伝的アルゴリズムで解きます

https://lychnus372.github.io/general_knapsack/

## 説明
costが最大になるように、品物の組み合わせを最適化します。
制約条件は品物の重さです。

cost_listとweight_listを書き換えることによって、一般のナップサック問題を解けるようにしています。

## 実行方法
cost_listとweight_listを適当に書き換えて、main()関数を呼び出すと問題を解いてくれます。

main()を1回呼び出すごとに、10世代分の交配が行われます。

学習データをリセットするにはリロードします。
