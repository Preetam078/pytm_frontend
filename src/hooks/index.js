export const useCapitalizeString = (str) => {
    let ans = ""
    for(let i = 0; i < str.length; i++) {
        if(i === 0) {
            ans += str[i].toUpperCase();
        }
        else {
            ans += str[i];
        }
    }
    return ans;
}