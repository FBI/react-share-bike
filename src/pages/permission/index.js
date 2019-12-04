import React, { Fragment } from 'react'
import { Card, Button, Table, Modal, Form, Input, Select, Message, Tree, Transfer } from 'antd'
import Utils from '../../utils/utils'
import fetchData from '../../utils/axios'
import menuConfig from '../../config/menuConfig'
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode

export default class PermissionSetting extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            tableList: []
        }
    }
    componentWillMount(){
        this.getTableList();   
    }
    getTableList() {
        fetchData.ajax({
            url:'/role/list',
            flag: true,
            data:{
                params:{}
            }
        }).then( res => {
            if(res.code === 0){
                let tableList  = res.result.item_list.map((item,i)=>{
                    item.key = i;
                    return item;
                })
                this.setState({
                    tableList
                })
            }
        })
    }
    // 角色创建
    onCreateRow() {
        this.setState({
            isRoleVisible:true
        })
    }
    //角色创建表单提交
    handleRoleSubmit() {
        let roleInfo = this.RoleFormObj.props.form.getFieldsValue()
        fetchData.ajax({
            url:'role/create',
            flag: true,
            data:{
                params:{
                    ...roleInfo
                }
            }
        }).then( res => {
            if(res){
                this.setState({
                    isRoleVisible:false
                })
                Message.success('角色创建成功')
                this.RoleFormObj.props.form.resetFields()
                this.getTableList();
            }
        })
    }
    onClickRow(rowData) {
        this.setState({ rowData })
    }
    // 权限设置 
    onPermissionSetting() {
        let rowData = this.state.rowData
        if(!rowData) {
            Modal.info({
                title: '警告',
                content: '请选择一个角色'
            })
            return
        }
        this.setState({ isPermissVisible: true })
    }
    // 权限表单提交
    handlePermissSubmit() {
        let data = this.permissFormObj.props.form.getFieldsValue()
        data.role_id = this.state.rowData.id
        data.menus = this.state.menuInfo
        fetchData.ajax({
            url:'/permission/edit',
            flag: true,
            data:{
                params:{
                    ...data
                }
            }
        }).then( res => {
            if(res){
                this.setState({
                    isPermissVisible:false
                })
                this.getTableList();
            }
        })
    }
    // 用户授权
    onUserAuth() {
        let item = this.state.rowData
        if(!item) {
            Modal.info({
                title: '信息',
                content: '未选中任何项目'
            })
            return;
        }
        this.getRoleUserList(item.id)
        this.setState({
            isUserAuth: true
        })
    }
    getRoleUserList(id) {
        fetchData.ajax({
            url:'/role/user_list',
            flag: true,
            data:{
                params:{
                    id
                }
            }
        }).then( res =>{
           res && this.getAuthUserList(res.result);
        })
    }
    // 筛选目标用户
    getAuthUserList(dataSource) {
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            dataSource.forEach(item => {
                const data = {
                    key: item.user_id,
                    title: item.user_name,
                    status: item.status,
                };
                if (data.status === 1) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            })
        }
        this.setState({mockData, targetKeys});
    };
    handleUserAuthSubmit() {
        let data = {};
        data.user_ids = this.state.targetKeys || [];
        data.role_id = this.state.rowData.id;
        fetchData.ajax({
            url:'/role/user_role_edit',
            flag: true,
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isUserAuth:false
                })
                this.getTableList();
            }
        })
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, 
            {
                title: '角色名称',
                dataIndex: 'role_name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formatTime
            }, 
            {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    if (status === 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, 
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formatTime
            }, 
            {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        const { tableList, rowData, isRoleVisible, isPermissVisible, menuInfo, targetKeys, mockData, isUserAuth } = this.state
        return (
            <Fragment>
                <Card>
                    <Button type="primary" onClick={() => this.onCreateRow()}>创建角色</Button>
                    <Button type="primary" onClick={() => this.onPermissionSetting()}>设置权限</Button>
                    <Button type="primary" onClick={() => this.onUserAuth()}>用户授权</Button>
                </Card>
                <div className='content-wrap'>
                    <Table 
                        columns={columns}
                        dataSource={tableList}
                        onRow={(rowData, idx) => {
                            return {
                                onClick: () => {
                                    this.onClickRow(rowData)
                                }
                            }
                        }}
                    />
                </div>
                <Modal
                    title='角色创建'
                    visible={isRoleVisible}
                    onOk={() => this.handleRoleSubmit()}
                    onCancel={() => {
                        this.RoleFormObj.props.form.resetFields();
                        this.setState(() => ({ isRoleVisible: false}))
                        
                    }}
                >
                    <RoleForm wrappedComponentRef={val => this.RoleFormObj = val} />
                </Modal>
                <Modal
                    title='权限设置'
                    visible={isPermissVisible}
                    onOk={() => this.handlePermissSubmit()}
                    onCancel={() => this.setState({ isPermissVisible: false})}
                >
                    <PermissForm 
                        roleData={rowData}
                        menuInfo={menuInfo}
                        wrappedComponentRef={val => this.permissFormObj = val}
                        patchMenuInfo={ checkedKeys => this.setState({ menuInfo: checkedKeys}) }
                    />
                </Modal>
                <Modal
                    width={650}
                    title='用户授权'
                    visible={isUserAuth}
                    onOk={() => this.handleUserAuthSubmit()}
                    onCancel={() => this.setState({ isUserAuth: false})}
                >
                    <RoleAuthForm 
                        targetKeys={targetKeys}
                        mockData={mockData}
                        roleData={rowData}
                        patchUserInfo={targetKeys => this.setState({ targetKeys })}
                    />
                </Modal>
            </Fragment>
        )
    }
}

class RoleForm extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 16
            }
        }
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            initialValue:''
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                            initialValue: ''
                        })(
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        )
    }
}
RoleForm = Form.create({})(RoleForm)
class PermissForm extends React.Component {
    componentWillReceiveProps(nextProps,nextState) {
        console.log(nextProps)
    }
    shouldComponentUpdate(nextProps,nextState) {
       if(nextProps.roleData === this.props.roleData) return false
       else return true
    }
    renderTreeNode(menuConfig) {
        return menuConfig.map(item => {
            if(item.children) {
                return <TreeNode {...item}>{this.renderTreeNode(item.children)}</TreeNode>
            }else {
                return <TreeNode {...item} />
            }
        })
    }
    onRoleCheck = (checkedKeys, info) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 16
            }
        }
        const { form, roleData, menuInfo } = this.props
        const { getFieldDecorator } = form
        const { menus } = roleData
        return  <Form layout="horizontal">
                    <FormItem label="角色名称：" {...formItemLayout}>
                        <Input disabled maxLength={8} placeholder={roleData.role_name} />
                    </FormItem>
                    <FormItem label="状态：" {...formItemLayout}>
                        {getFieldDecorator('status',{
                            initialValue: '1'
                        })(
                            <Select style={{ width: 80}}
                                    placeholder="启用"
                            >
                                <Option value="1">启用</Option>
                                <Option value="0">停用</Option>
                            </Select>
                        )}
                    </FormItem>
                    <Tree
                        checkable
                        defaultExpandAll
                        defaultCheckedKeys={menuInfo || menus}
                        onCheck={this.onRoleCheck}
                    >
                        <TreeNode title='平台权限'>
                            {this.renderTreeNode(menuConfig)}
                        </TreeNode>
                    </Tree>
                </Form>
    }
}
PermissForm = Form.create({})(PermissForm)
class RoleAuthForm extends React.Component {
    filterOption(inputValue, option) {
        return option.title.indexOf(inputValue) > -1;
    };
    handleChange(targetKeys) {
        this.props.patchUserInfo(targetKeys);
    };
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 18
            }
        };
        const { roleData, targetKeys, mockData } = this.props
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength={8} placeholder={roleData.role_name}/>
                </FormItem>
                <FormItem label="选择用户：" {...formItemLayout}>
                    <Transfer
                        listStyle={{width: 200,height: 400}}
                        dataSource={mockData}
                        showSearch
                        titles={['待选用户', '已选用户']}
                        locale={{searchPlaceholder: '请输入用户名'}}
                        filterOption={this.filterOption}
                        targetKeys={targetKeys}
                        onChange={() => this.handleChange()}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm)