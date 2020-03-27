<template>
    <el-dialog
            v-loading="false"
            id="DialogInfoListEdit"
            title="编辑"
            :visible.sync="dialogState"
            @close="close"
            width="580px"
            @open="openDialog">
        <el-form :model="formData" ref="addInfoForm" :rules="infoRules" id="form">
            <el-form-item
                    label="类别："
                    prop="categoryId"
                    :label-width="formConfig.formLabelWidth">
                <el-select placeholder="请选择分类" v-model="formData.categoryId">
                    <el-option
                        v-for="categoryType in categoryTypeList"
                        :key="categoryType.id"
                        :value="categoryType.id"
                        :label="categoryType.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                    label="标题："
                    prop="title"
                    :label-width="formConfig.formLabelWidth">
                <el-input v-model="formData.title" placehoder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item
                    label="概况："
                    prop="content"
                    :label-width="formConfig.formLabelWidth">
                <el-input
                        type="textarea"
                        v-model="formData.content"
                        placehoder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="pageState.addButtonLoading" @click="submit('addInfoForm')">{{ pageState.addButtonLoadName }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {getInfoCategoryListByLevel} from "@/api/infoCategory";
    import {validateNull} from "@/utils/validate";
    import {addInfo, getInfoById, updateInfo} from "@/api/info";

    export default {
        name: "DialogInfoListEdit",
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            categoryTypeListPro: {
                type: Array,
                default: new Array()
            },
            editItemIdPro: {
                type: Number,
                default: -1
            }
        },
        data() {
            const validateCategory = (rule, value, callback) => {
                if (validateNull(value)) {
                    callback(new Error('分类不能为空！'));
                }
                callback();
            };

            const validateTitle = (rule, value, callback) => {
                if (validateNull(value)) {
                    callback(new Error('标题不能为空！'));
                }
                callback();
            };

            const validateContent = (rule, value, callback) => {
                if (validateNull(value)) {
                    callback(new Error('内容不能为空！'));
                }
                callback();
            };

            return {
                formData: {
                    id: '',
                    title: '',
                    content: '',
                    categoryId: ''
                },
                formConfig: {
                    formLabelWidth: '70px'
                },
                infoRules: {
                    category: [
                        { validator: validateCategory, trigger: 'blur' }
                    ],
                    title: [
                        { validator: validateTitle, trigger: 'blur' }
                    ],
                    content: [
                        { validator: validateContent, trigger: 'blur' }
                    ],
                },
                dialogState: false,
                pageState: {
                    addButtonLoading: false,
                    addButtonLoadName: '保存'
                },
                editItemId: '',
                categoryTypeList: []
            }
        },
        methods: {
            close() {
                this.dialogState = false;
                this.$refs['addInfoForm'].resetFields();
                this.$emit("close", false);
            },

            editSuccess(data) {
                this.dialogState = false;
                this.$emit("editSuccess", data);
            },

            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addInfoByForm();
                    } else {
                        this.$message({
                            message: '表单验证失败，请检查表单信息！',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },

            getCategory() {
                getInfoCategoryListByLevel(1).then(response => {
                    this.categoryTypeList = response.data;
                })
            },

            addInfoByForm() {
                this.pageState.addButtonLoading = true;
                this.pageState.addButtonLoadName = '保存中';
                updateInfo(this.formData.id, this.formData).then((response) => {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.$refs['addInfoForm'].resetFields();
                    this.editSuccess(response.data);
                }).finally(() => {
                    this.pageState.addButtonLoading = false;
                    this.pageState.addButtonLoadName = '保存';
                });
            },

            openDialog() {
                const loading = this.$loading({
                    lock: true,
                    text: '加载中...',
                    background: 'rgba(0, 0, 0, 0.3)',
                    document: document.querySelector("#DialogInfoListEdit")
                });

                getInfoById(this.editItemId).then(response => {
                    let data = response.data;
                    this.formData.id = data.id;
                    this.formData.name = data.name;
                    this.formData.content = data.content;
                    this.formData.title = data.title;
                    this.formData.categoryId = data.categoryId;
                }).finally(() => {
                    loading.close();
                });
            }
        },
        watch: {
            dialogVisible(newVal){
                this.dialogState = newVal;
            },
            categoryTypeListPro(newVal) {
                this.categoryTypeList = newVal;
            },
            editItemIdPro(newVal) {
                this.editItemId = newVal;
            }
        }
    }
</script>

<style scoped>

</style>