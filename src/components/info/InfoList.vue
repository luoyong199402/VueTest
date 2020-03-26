<template>
    <div>
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">分类：&nbsp;</label>
                    <div class="warp-content">
                        <el-select placeholder="请选择活动区域" v-model="queryParam.category" clearable>
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
                <el-input v-model="queryParam.fieldValue" clearable></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" style="width: 100%;" @click="getPageList">搜索</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" class="pull-right" @click="addInfo" style="width: 100%;">新增</el-button>
            </el-col>
        </el-row>
        <div class="black-space-30"></div>
        <el-row>
            <el-table
                    v-loading="tabLoading"
                    header-align="center"
                    ref="multipleTable"
                    :data="tableData.content"
                    border
                    @sort-change="tableChangeEvent"
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
                        label="序号"
                        type="index"
                        width="55">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        label="标题"
                        sortable="custom"
                        prop="title"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="categoryName"
                        label="类别"
                        :filters="getFilterCategory()"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="createTime"
                        label="日期"
                        sortable="custom"
                        show-overflow-tooltip>
                </el-table-column><el-table-column
                        align="center"
                        header-align="center"
                        prop="createUserName"
                        label="管理人"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    header-align="center"
                    label="操作"
                    width="180"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <div style="height: 10px"></div>
        <el-row>
            <el-pagination
                    class="pull-right"
                    style="height: 40px"
                    :current-page="tableData.pageNo + 1"
                    :page-sizes="[10, 20, 30, 40, 50, 100]"
                    :page-size="tableData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total"
                    @size-change="sizeChangeEvent"
                    @current-change="currentPageEvent">
            </el-pagination>
        </el-row>

        <!--列表新增对话框-->
        <DialogInfoListAdd :dialog-visible="dialogVisible" :category-type-list-pro="categoryTypeList"
                           @close="closeDialog" @addSuccess="getPageList"></DialogInfoListAdd>
    </div>
</template>

<script>
    import DialogInfoListAdd from "@/components/info/dialog/DialogInfoListAdd";
    import {getInfoCategoryListByLevel} from "@/api/infoCategory";
    import {queryInfo} from "@/api/info";
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
                tableData: {},
                sortInfo: {},
                tabLoading: false,
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
                });
            },

            getPageList() {
            // .param("page", "1")
            //         .param("size", "2")
            //         .param("sort", "id,desc")
            //         .param("sort", "loginName")
                // 添加查询条件
                let query = {};
                if (this.tableData.pageNo != null) {
                    query.page = this.tableData.pageNo - 1;
                    query.size = this.tableData.pageSize;
                    query.categoryId = this.queryParam.category;
                    query[this.queryParam.fieldName] = this.queryParam.fieldValue;

                    // dateTime
                    if (this.queryParam.dateTime != null) {
                        query.createTimeStartTime = this.queryParam.dateTime[0];
                        query.createTimeEndTime = this.queryParam.dateTime[1];
                    }

                    // 排序信息
                    query.sort = this.sortInfo;
                }

                this.tabLoading = true;
                queryInfo(query).then(response => {
                    this.tableData = response.data;
                }).finally(() => {
                    this.tabLoading = false;
                });
            },

            sizeChangeEvent(val) {
                this.tableData.pageSize = val;
                this.getPageList();
            },
            currentPageEvent(val) {
                this.tableData.pageNo = val;
                this.getPageList();
            },
            tableChangeEvent({column, prop, order}) {
                if (order == null) {
                    return ;
                }
                this.sortInfo = `${prop},${order == 'ascending' ? 'asc' : 'desc'}`
                this.getPageList();
            },
            getFilterCategory() {
                console.log("cat");
                return this.categoryTypeList.map((data) => {
                    return {
                        text: data.name,
                        value: data.id
                    }
                })
            }
        },
        mounted() {
            this.getCategory();
            this.getPageList();

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
