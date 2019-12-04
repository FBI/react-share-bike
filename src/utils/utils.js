import React from 'react'
import { Select } from 'antd'
const Option = Select.Option

export default {
    pagination(result,callback) {
        return {
            onChange: currentPage => {
                callback(currentPage)
            },
            current:result.pageNum || result.page,
            pageSize:result.pageSize || result.page_size,
            total: result.totalCount || result.total_count,
            showTotal:()=>{
                return `共${result.total_count}条`
            },
            showQuickJumper:true
        }
    },
    getOptionList(data){
        if(!data) return [];
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.forEach( item => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
}