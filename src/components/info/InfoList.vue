<template>
    <div>
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">分类：&nbsp;</label>
                    <div class="warp-content">
                        <el-select placeholder="请选择活动区域" v-model="queryParam.category">
                            <el-option
                                v-for="categoryType in categoryTypeList"
                                :key="categoryType.id"
                                :value="categoryType.id"
                                :label="categoryType.name"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-wrap date">
                    <label for="">日期：&nbsp;&nbsp;</label>
                    <div class="warp-content">
                        <el-date-picker
                                style="width: 100%;"
                                type="datetimerange"
                                v-model="queryParam.dateTime"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['12:00:00', '08:00:00']">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="label-wrap key-work">
                    <label for="">关键字：&nbsp;&nbsp;</label>
                    <div class="warp-content">
                        <el-select placeholder="请选择分类" v-model="queryParam.fieldName">
                            <el-option label="主键" value="id"></el-option>
                            <el-option label="标题" value="title"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-input v-model="queryParam.fieldValue"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width: 100%;">搜索</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" class="pull-right" @click="addInfo" style="width: 100%;">新增</el-button>
            </el-col>
        </el-row>
        <div class="black-space-30"></div>
        <el-row>
            <el-table
                    header-align="center"
                    ref="multipleTable"
                    :data="tableData"
                    border
                    tooltip-effect="dark"
                    stripe
                    :height="tableHeight"
                    style="width: 100%;">
                <el-table-column
                        align="center"
                        header-align="center"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        label="标题"
                        width="120">
                    <template slot-scope="scope">123</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="name"
                        label="类别"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="address"
                        label="日期"
                        show-overflow-tooltip>
                </el-table-column><el-table-column
                        align="center"
                        header-align="center"
                        prop="address"
                        label="管理人"
                        show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-row>
        <div style="height: 10px"></div>
        <el-row>
            <el-pagination
                    class="pull-right"
                    style="height: 40px"
                    :current-page="2"
                    :page-sizes="[10, 20, 30, 40, 50, 100]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </el-row>

        <!--列表新增对话框-->
        <DialogInfoListAdd :dialog-visible="dialogVisible" @close="closeDialog"></DialogInfoListAdd>
    </div>



</template>

<script>
    import DialogInfoListAdd from "@/components/info/dialog/DialogInfoListAdd";
    import {getInfoCategoryListByLevel} from "@/api/infoCategory";
    export default {
        name: "InfoList",
        components: {DialogInfoListAdd},
        data: function() {
            return {
                queryParam: {
                    category: '',
                    dateTime: '',
                    fieldName: 'id',
                    fieldValue: ''
                },
                dialogVisible: false,
                tableHeight: window.innerHeight - 180 - 50 - 35,
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                categoryTypeList: []
            }
        },
        methods: {
            addInfo() {
                this.dialogVisible = true;
            },

            closeDialog(state) {
                this.dialogVisible = state;
            },
            getCategory() {
                getInfoCategoryListByLevel(1).then(response => {
                    this.categoryTypeList = response.data;
                })
            }
        },
        mounted() {
            this.getCategory();
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/config.scss";
    .label-wrap {
        &.category {
            @include labelDom(left, 60, 40);
        }
        &.date {
            @include labelDom(right, 93, 40);
        }
        &.key-work {
            @include labelDom(right, 99, 40);
        }
    }
</style>
