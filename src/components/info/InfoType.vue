<template>
    <div>
        <el-button type="danger" @click="addCategoryLevelOne">添加一级分类</el-button>
        <hr class="hr-e9e9e9" />

        <el-row :gutter="14">
            <el-col :span="8" >
                <div class="tree-container" style="height: 100%; overflow: auto">
                    <el-tree
                            :data="data"
                            ref="tree"
                            :indent='0'
                            lazy
                            :load="loadChildData"
                            :props="props"
                            node-key="id"
                            show-checkbox
                            @node-click="treeNodeClick"
                            :render-content="renderContent"
                            :expand-on-click-node="false">
                    </el-tree>
                </div>

            </el-col>
            <el-col :span="16">
                <h4 class="menu-title">{{ formDesc.categoryLevelName }}</h4>
                <el-form :model="formData" ref="categoryForm" label-width="80px" class="from-wrap" :rules="formRules">
                    <el-form-item label="分类名称:" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="分类编码:" prop="code">
                        <el-input v-model="formData.code"></el-input>
                    </el-form-item>
                    <el-form-item label="排序号:" prop="sort">
                        <el-input type="number" v-model="formData.sort"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :loading="formState.saveButtonLoading" @click="onSubmit('categoryForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>


<script>
    import {
        addInfoCategory,
        deleteInfoCategory,
        getInfoCategoryListByLevel,
        getInfoCategoryListByParentId
    } from "../../api/infoCategory";
    import {validateCode, validateNull, validateNumber} from "../../utils/validate";

    export default {
        name: 'InfoType',
        data() {
            const validateName = (rule, value, callback) => {
                if (validateNull(value)) {
                    callback(new Error('名称不能空！'));
                }
                callback();
            };

            const validateCategoryCode = (rule, value, callback) => {
                if (validateNull(value)) {
                    callback(new Error('编码不能空！'));
                }

                if (!validateCode(value)) {
                    callback(new Error('编码只能有数字和字母构成！'));
                }
                callback();
            };

            const validateCategorySort = (rule, value, callback) => {
                if (validateNull(value)) {
                    callback(new Error('排序号不能为空！'));
                }

                if (!validateNumber(value)) {
                    callback(new Error('排序号只能是数字！'));
                }
                callback();
            };

            return {
                data: [],

                formRules: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    code: [
                        { validator: validateCategoryCode, trigger: 'blur' }
                    ],
                    sort: [
                        { validator: validateCategorySort, trigger: 'blur' }
                    ],
                },

                props: {
                    isLeaf(data, node) {
                        if (data.level == 1) {
                            return false;
                        }
                        return true;
                    }
                },
                formData: {
                    id: '',
                    name: '',
                    code: '',
                    sort: '',
                    parentId: '',
                    level: 1
                },
                formDesc: {
                    categoryLevelName: '添加一级分类'
                },
                formState: {
                    saveButtonLoading: false
                },

            }
        },

        // 创建后初始化一些数据
        created() {
            getInfoCategoryListByLevel(1).then((response) => {
                this.data = response.data;
            });
        },

        methods: {
            loadChildData(node, resolve) {
                // 系统在之前初始化第一级节点
                if (node.level == 0) {
                   return ;
                } else {
                    getInfoCategoryListByParentId(node.data.id).then((response) => {
                        resolve(response.data)
                    });
                }
            },

            isTreeLeaf(data, node) {
                debugger;
                if (node.level== 1) {
                    return true;
                }
                return false;
            },

            treeNodeClick(data, node, tree) {
                this.editCategory(data, node);
            },

            addCategoryLevelOne() {
                this.formDesc.categoryLevelName = '添加一级分类'
                this.formData.level = 1;
                this.formData.parentId = '';

            },

            addCategoryLevelTwo(data, node) {
                debugger
                this.formDesc.categoryLevelName = '添加二级分类'
                this.formData.level = 2;
                this.formData.parentId = data.id;
                return false;
            },

            addTreeNode(parentId, data) {
                // 如果没有节点 则直接添加到根节点上
                if (parentId == null) {
                    this.data.push(data);
                } else {
                    this.$refs.tree.append(data, parentId);
                }
            },

            deleteTreeNode(data) {
                this.$refs.tree.remove(data);
            },

            editCategory(data, node) {
                if (data.level == 1) {
                    this.formDesc.categoryLevelName = '编辑一级分类';
                } else {
                    this.formDesc.categoryLevelName = '编辑二级分类';
                }

                this.formData.id = data.id;
                this.formData.name = data.name;
                this.formData.code = data.code;
                this.formData.sort = data.sort;
                this.formData.level = data.level;
                this.formData.parentId = data.parentId;
            },

            deleteCategory(data, node) {
                let msg = '';
                if (data.level == 1) {
                    msg = "请确认是否删除！ 删除当前分类时，将会删除其子节点!";
                } else {
                    msg = "请确认是否删除!";
                }

                this.$confirm(msg, '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    return deleteInfoCategory(data.id)
                }).then((response) => {
                    this.deleteTreeNode(response.data);
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                });
            },

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.formState.saveButtonLoading = true;
                        addInfoCategory(this.formData).then(response => {
                            this.addTreeNode(response.data.parentId, response.data);
                            console.log(response.data)
                            this.formState.saveButtonLoading = false;
                        }).catch(() => {
                            this.formState.saveButtonLoading = false;
                        })
                    } else {
                        this.$message({
                            message: '表单验证失败，请检查表单信息！',
                            type: 'warning'
                        });
                        return false;
                    }
                    this.formState.saveButtonLoading = false;
                });
            },

            renderContent(h, { node, data, store }) {
                if (data.level == 1) {
                    return (
                        <div class="tree-line">
                            <span>{ node.data.name }</span>
                            <div class="button-group pull-right">
                                <el-button
                                        size="mini"
                                        type="success" round on-click={ () => {this.addCategoryLevelTwo(node.data, node); return false;} }>添加子级</el-button >
                                <el-button
                                        size="mini"
                                        type="danger" round on-click={ () => this.editCategory(node.data, node) }>编辑</el-button>
                                <el-button
                                        size="mini" round on-click={ () => this.deleteCategory(node.data, node) }>删除</el-button>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div class="tree-line">
                            <span>{ node.data.name }</span>
                            <div class="button-group pull-right">
                                <el-button
                                    size="mini"
                                    type="danger" round on-click={ () => this.editCategory(node.data, node) }>编辑</el-button>
                                <el-button
                                     size="mini" round on-click={ () => this.deleteCategory(node.data, node) }>删除</el-button>
                            </div>
                        </div>
                    );
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .menu-title {
        line-height: 44px;
        padding-left: 22px;
        background-color: #f3f3f3;
    }

    .from-wrap {
        width: 410px;
        padding-top: 26px;
    }

    .tree-container /deep/ {
        .button-group {
            display: none;
        }

        .tree-line:hover .button-group {
            display: block;
        }

        .tree-line {
            width: 100%;
            height: 40px;
            line-height: 40px;
        }
        .el-tree-node__content {
            height: 40px;
        }

        .el-tree > .el-tree-node:after {
            border-top: none;
        }
        .el-tree-node {
            position: relative;
            padding-left: 30px;
        }
        //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
        .el-tree-node__expand-icon.is-leaf{
            display: none;
        }
        .el-tree-node__children {
            padding-left: 16px;
        }

        .el-tree-node :last-child:before {
            height: 45px;
        }

        .el-tree > .el-tree-node:before {
            border-left: none;
        }

        .el-tree > .el-tree-node:after {
            border-top: none;
            height: 0px;
        }

        .el-tree-node:before {
            content: "";
            left: -4px;
            position: absolute;
            right: auto;
            border-width: 1px;
        }

        .el-tree-node:after {
            content: "";
            left: -4px;
            position: absolute;
            right: auto;
            border-width: 1px;
        }

        .el-tree-node:before {
            border-left: 1px dashed #4386c6;
            bottom: 0px;
            height: 100%;
            top: -26px;
            width: 1px;
        }

        .el-tree-node:after {
            border-top: 1px dashed #4386c6;
            height: 20px;
            top: 21px;
            width: 32px;
        }

        .el-tree {
            margin-left: -30px;
        }

        .el-tree .el-tree-node__expand-icon.expanded // 取消旋转
        {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        .el-tree .el-icon-caret-right:before {
            content: '\e723';
            font-size: 18px;
        }
        .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
            content: '\e722';
            font-size: 18px;
        }
    }

</style>
