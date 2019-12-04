import React from 'react'
import { Card, Row, Col, Modal } from 'antd'
import './ui.less'

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            currentImgUrl: '',
            galleryItems: []
        }
    }
    openModal(imgUrl) {
        this.setState({
            isVisible: true,
            currentImgUrl: '/gallery/' + imgUrl
        })
    }
    componentWillMount() {
        const imgUrls = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ]
        const galleryItems = imgUrls.map( list => list.map( 
            item => <Card 
                        style={{marginBottom:10}} 
                        cover={<img alt='' src={'/gallery/'+item} 
                        style={{cursor: 'pointer'}}
                        onClick={() => this.openModal(item)} />}
                    >
                        <Card.Meta title={item} description="React Vue Angulr React-Navti Weex Flutter"></Card.Meta>
                    </Card>)
        )
        this.setState({ galleryItems })
    }
    render() {
        return (
            <div className='card-wrap'>
                <Row gutter={10}>
                    { 
                        this.state.galleryItems.map( 
                            (item,idx) => <Col style={{width: '20%'}} span={(idx+1) % 5 === 0 ? 5 : 4}>
                                                {item}
                                          </Col>  
                        ) 
                    }
                </Row>
                <Modal
                    width={500}
                    height={400}
                    footer={null}
                    title='picture gallery'
                    visible={this.state.isVisible}
                    onCancel={() => this.setState({ isVisible: false })}
                >
                    <img src={this.state.currentImgUrl} alt='' style={{width: '100%',height: '100%'}} />
                </Modal>
            </div>
        )
    }
}