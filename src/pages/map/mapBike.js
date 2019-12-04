import React, { Fragment } from 'react'
import { Card } from 'antd'
import BasicForm from '../../commons/basicForm'
import fetchData from '../../utils/axios'
import BMap from 'BMap'
export default class MapBike extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total_count: 0
        }
    }
    componentDidMount() {
        this.getMapData()
    }
    getMapData() {
        fetchData.ajax({
            url: '/map/bike_list',
            flag: true,
            data: {
                params: {
                    page: 1
                }
            }
        }).then( res => {
            this.setState({
                total_count: res.result.total_count
            })
            this.renderMap(res.result)
        })
    }
    renderMap(res) {
        let list = res.route_list;
        this.map = new BMap.Map("bikeMapContainer", {enableMapClick: false});
        let gps1 = list[0].split(',');
        let startPoint = new BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length - 1].split(',');
        let endPoint = new BMap.Point(gps2[0], gps2[1]);

        this.map.centerAndZoom(endPoint, 11);
        // map.clearOverlays();

        //添加起始图标
        let startPointIcon = new BMap.Icon("/assets/start_point.png", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: new BMap.Size(18, 42)
        });
        
        let bikeMarkerStart = new BMap.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);

        let endPointIcon = new BMap.Icon("/assets/end_point.png", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: new BMap.Size(18, 42)
        });
        let bikeMarkerEnd = new BMap.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        let routeList = [];
        list.forEach((item)=>{
            let p = item.split(",");
            let point = new BMap.Point(p[0], p[1]);
            routeList.push(point);
        })
        // 行驶路线
        let polyLine = new BMap.Polyline(routeList, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyLine);

        // 服务区路线
        let serviceList = res.service_list;
        let servicePointist = [];
        serviceList.forEach((item) => {
            let point = new BMap.Point(item.lon, item.lat);
            servicePointist.push(point);
        })
        // 画线
        let polyServiceLine = new BMap.Polyline(servicePointist, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyServiceLine);

        // 添加地图中的自行车
        let bikeList = res.bike_list;
        let bikeIcon = new BMap.Icon("/assets/bike.jpg", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: new BMap.Size(18, 42)
        });
        bikeList.forEach((item) => {
            let p = item.split(",");
            let point = new BMap.Point(p[0], p[1]);
            let bikeMarker = new BMap.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })
        
        // 添加地图控件
        this.addMapControl();
    }
    // 添加地图控件
    addMapControl() {
        let map = this.map;
        // 左上角，添加比例尺
        let top_right_control = new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        let top_right_navigation = new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        //添加控件和比例尺
        map.addControl(top_right_control);
        map.addControl(top_right_navigation);
        map.enableScrollWheelZoom(true);
        // legend.addLegend(map);
    };
    formList = [
        {
            type: '城市',
            field: 'city',
            initialValue: '0',
            list: [{id: '0', name: '北京'}, {id: '1', name: '上海'}, {id: '3', name: '长沙'}]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            palceholder: '全部',
            initialValue: '0',
            list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '3', name: '行程结束'}]
        }
    ]
    render() {
        return (
            <Fragment>
                <Card>
                    <BasicForm 
                        formList={this.formList}
                    />
                </Card>
                <div>共{this.state.total_count}辆车</div>
                <div style={{height: 500}} id='bikeMapContainer'></div>
            </Fragment>
        )
    }
}