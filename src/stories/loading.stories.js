import React from "react";
import { Loading } from '../components/LoadingIsland';
import {Dialog} from "../components/Dialog";

export default {
    title: 'island',
    component: Loading,
};

export const loading = () => <Loading />;

export const dialog = () => <Dialog style={{ width: '250px', height: '80px' }}>
    <p>钓到黑鲈鱼啦</p>
    <p>有几厘米？几厘米啊？</p>
</Dialog>
