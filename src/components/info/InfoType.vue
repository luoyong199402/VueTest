<template>
    <div class="custom-tree-container">
        <div class="block">
            <p>使用 render-content</p>
            <el-tree
                    :data="data"
                    node-key="id"
                    default-expand-all
                    :render-content="renderContent"
                    :expand-on-click-node="false">
            </el-tree>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'InfoType',
        data() {
            const data = [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }];

            return {
                data: JSON.parse(JSON.stringify(data))
            }
        },

        methods: {
            renderContent(h, { node, data, store }) {
                return (<span>{node.label}</span>);
            }
        }
    };
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
