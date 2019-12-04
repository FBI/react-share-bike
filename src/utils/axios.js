import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static handleJsonp(options) {
        return new Promise((resolve, reject) => {
            Jsonp(options.url,{
                param: 'callback'
            },function(err, res) {
                res.status === 'success' ? resolve(res.results) : reject(res.message)
            })
        })
    }
    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseURL =  'https://www.easy-mock.com/mock/5ca81bce6b075548acae3af7/sharebike';
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve,reject) => {
            axios({
                baseURL: options.flag ? baseApi : baseURL,
                url: options.url,
                method: 'get',
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then( res => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(res.status === 200) {
                    if(res.data.code === 0 || res.data.code === '0') {
                        resolve(res.data)
                    }else {
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else {
                    reject(res.data)
                }
            })
        })
    }
}