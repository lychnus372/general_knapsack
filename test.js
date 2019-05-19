// ナップザック問題
// 品物の総重量が一定以下になるように、品物の総価値を最大化する

//品物の値段
const cost_list = [120, 25, 1, 2, 30, 50, 85, 7];
//品物の重さ
const weight_list = [2500, 800, 30, 50, 600, 1300, 1700, 250];
//重さの上限
const weight_max = 3200;
//1世代の子供の数
const num_children = 100;
//突然変異の起こる割合
const rate_mutation = 0.2;
//もう一度突然変異させる割合
const rate_more_mutation = 0.25;
//親を突然変異させる割合
const rate_mutate_parent = 0.5;
//親の数
const num_parent = 5;


const cost = dna =>{
    let sum = 0;
    for(let i=0;i<cost_list.length;i++){
        if(dna[i]===1){
            sum += cost_list[i];
        }
    }

    return sum;
};

const weight = dna =>{
    let sum = 0;
    for(let i=0;i<weight_list.length;i++){
        if(dna[i]===1){
            sum += weight_list[i];
        }
    }

    return sum;
};

const mate = (dna1, dna2) =>{

    if(dna1.length!==dna2.length){
        throw "okasii";
    }

    const child = [];

    for(let i=0;i<dna1.length;i++){
        let gene;
        if(Math.random()<0.5){
            gene = dna1[i];
        }else{
            gene = dna2[i];
        }

        child[i] = gene;
    }
    
    
    
    return child;
};

const mutate = _dna =>{
    let dna = [];
    for(let i=0;i<_dna.length;i++){
        dna[i] = _dna[i];
    }

    const position = ~~(Math.random()*dna.length);

    if(dna[position]===1){
        dna[position] = 0;
    }else{
        dna[position] = 1;
    }

    //一定割合で複数個の遺伝子を突然変異させる
    if(Math.random()<rate_more_mutation){
        dna = mutate(dna);
    }

    return dna;
};

const kill = dna =>{
    for(let i=0;i<dna.length;i++){
        dna[i] = 0;
    }
};

const isSameDNA = (dna1, dna2)=>{
    for(let i=0;i<dna1.length;i++){
        if(dna1[i]!==dna2[i]){
            return 0;
        }
    }
    return 1;
};

const parent = new Array(num_parent);
const dnas = new Array(num_children);

parent[0] = new Array(cost_list.length).fill(0);
parent[1] = new Array(cost_list.length).fill(0);

const ga = ()=>{
    if(cost_list.length!==weight_list.length){
        throw "damedame";
    }

    //前の世代の優秀なDNA2つをそのまま引き継ぐ
    dnas[0] = parent[0];
    dnas[1] = parent[1];

    //一定割合で親も突然変異させる
    if(Math.random()<rate_mutate_parent){
        dnas[1] = mutate(dnas[1]);
    }

    for(let i=2;i<dnas.length;i++){
        //親同士を交配
        dnas[i] = mate(parent[0], parent[1]);
    }

    for(let i=0;i<dnas.length;i++){
        //一定割合で突然変異を起こす
        if(Math.random()<rate_mutation){
            dnas[i] = mutate(dnas[i]);
        }

        //重さの上限を超えた子供は殺す
        if(weight(dnas[i])>weight_max){
            kill(dnas[i]);
        }
    }

    //子供を優秀な順にソート
    for(let i=0;i<dnas.length-1;i++){
        for(let j=i+1;j<dnas.length;j++){
            //同じDNAの子供は殺す
            if(isSameDNA(dnas[i], dnas[j])){
                kill(dnas[j]);
            }

            //ソートする
            if(cost(dnas[i])<cost(dnas[j])){
                const dna = dnas[i];
                dnas[i] = dnas[j];
                dnas[j] = dna;
            }
        }
    }

    parent[0] = dnas[0];
    parent[1] = dnas[1];

};

const main = (N=10)=>{
    for(let i=0;i<N;i++){
        ga();
    }

    console.log(`parent0: ${parent[0].toString()} cost: ${cost(parent[0])} weight: ${weight(parent[0])}`);
    console.log(`parent1: ${parent[1].toString()} cost: ${cost(parent[1])} weight: ${weight(parent[1])}`);
};