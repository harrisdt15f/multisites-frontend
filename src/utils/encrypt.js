/* eslint-disable */
//偏移量 由前端每次请求随机生成 16位
var IV = 'digfnndoa156d2d4'
//AES加密KEY 由前端自己每次请求随机生成
var KEY = '2gdiwjdo2600dhdo'
//公钥固定值
var pkcs8_public="-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCt5ugWm2WdqkMI5iDgTmdavYPTp6hmqbopy7N9fNnsNiwEE+toi0XgQjQeuE0Yf7VOIiCI8eWzUaTWfCK3D/dmFTbsTK3Ugql6QuYKRhSn9QnxtEqzvkz5jv3dc3sSav8gK3Ox22DBWUX5LOwY52kBieawlRFckv8vtCOYVPrd+wIDAQAB-----END PUBLIC KEY-----";


/**
 * AES加密数组 传入参数为需要传递的数组JSON
 */
export function AES_encrypt(data,KEY,IV,pkcs8_public) {
    var key_utf8 = CryptoJS.enc.Utf8.parse(KEY);// 秘钥
    var iv_utf8= CryptoJS.enc.Utf8.parse(IV);//向量iv
    //AES 加密
    var encrypted = CryptoJS.AES.encrypt(data, key_utf8, { iv: iv_utf8, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString();
    //RSA 加密 组包
    return pack(encrypted,IV,KEY,pkcs8_public)
}
//RSA加密
function RSA_encrypt(data,PUBLIC_KEY) {
    let encryptor = new JSEncrypt();  // 新建JSEncrypt对象
    encryptor.setPublicKey(PUBLIC_KEY); // 设置公钥
    const rsaDta = encryptor.encrypt(data); // 进行加密
    return rsaDta
}
//组包
function pack(encrypted,iv,key,pub_key) {

    var rsa_iv = RSA_encrypt(iv,pub_key);
    var rsa_key = RSA_encrypt(key,pub_key);

    var splitFlag = 'aesrsastart'

    /*
    var res_data = JSON.stringify( {
        'data':encrypted+splitFlag+rsa_iv+splitFlag+rsa_key
    } )
    */

    var res_data = encrypted+splitFlag+rsa_iv+splitFlag+rsa_key
    return res_data
}


//发送数据
function send(encrypt_data){
    $.ajax({
        //提交数据的类型 POST GET
        type:"Post",
        //提交的网址
        url:"http://www.dev1.com/api/accountChangeType/field-mod",
        //提交的数据
        data:{data:encrypt_data},
        //返回数据的格式
        dataType: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //成功返回之后调用的函数
        success:function(data){
            console.log(data)
        } ,
        //调用出错执行的函数
        error: function(){
            console.log('请求错误')
        }
    });
}


//需要发送的数据
var data = {title:100,name:'jeff'}
//数据需要json
data = JSON.stringify(data)

//加密后的数据 json 直接传递给后端
var encrypt_data = AES_encrypt(data,KEY,IV,pkcs8_public);

