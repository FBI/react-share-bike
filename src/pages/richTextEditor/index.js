import React, { Fragment } from 'react'
import { Card, Button, Modal } from 'antd'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'

export default class RichTextEditor extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            showRichText: false,
            editorState: ''
        }
    }
    handleClearContent = ()=>{
        this.setState({
            editorState:''
        })
    }

    handleGetText = ()=>{
        this.setState({
            showRichText:true
        })
    }

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };
    render() {
        const { editorContent, editorState, showRichText } = this.state
        return (
            <Fragment>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(editorContent)}
                </Modal>
            </Fragment>
        )
    }
}