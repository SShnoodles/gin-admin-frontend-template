<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="state.title"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="120px"
        :model="state.form"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="state.form.name" />
        </el-form-item>
        <el-form-item label="信用代码" prop="creditCode">
          <el-input v-model="state.form.creditCode" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="state.form.address" />
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            :data="menus"
            ref="tree"
            node-key="id"
            show-checkbox
            :props="defaultProps"
            default-expand-all
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveOrUpdate">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, nextTick, onMounted } from "vue";
import { Org, getOrg, editOrg, addOrg, getOrgMenus } from "@/api/org";
import { getMenus } from "@/api/menu";
import { FormInstance, FormRules, ElMessage, ElTree } from "element-plus";
const props = defineProps({
  id: String
});
const emits = defineEmits(["close"]);

const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [{ required: true, message: "应用名称 必填", trigger: "blur" }],
  creditCode: [
    { required: true, message: "应用英文名称 必填", trigger: "blur" }
  ],
  address: [{ required: true, message: "仓库地址 必填", trigger: "blur" }]
});
const tree = ref<InstanceType<typeof ElTree>>();
const menus = ref();
const defaultProps = ref({
  children: "children",
  label: "name"
});

const dialogVisible = ref(false);
const state = reactive({
  title: "",
  form: {
    name: "",
    address: "",
    creditCode: "",
    menuIds: []
  } as Org
});

watch(
  () => dialogVisible.value,
  v => {
    if (v) {
      nextTick(() => {
        if (props.id) {
          state.form = {} as Org;
          state.title = "修改";
          handleGet(props.id);
        } else {
          state.title = "新增";
          state.form = {} as Org;
          tree.value.setCheckedKeys([]);
        }
      });
    }
  }
);

const handleGet = async (id: string) => {
  try {
    state.form = await getOrg(id);
    const menuIds = await getOrgMenus(id);
    tree.value.setCheckedKeys(menuIds);
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const saveOrUpdate = async () => {
  const check = await formRef.value.validate();
  if (!check) return;

  state.form.menuIds = tree.value.getCheckedKeys();
  try {
    if (props.id) {
      await editOrg(props.id, state.form);
    } else {
      await addOrg(state.form);
    }
    emits("close");
    dialogVisible.value = false;
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const handleMenus = async () => {
  try {
    menus.value = await getMenus();
  } catch (e) {
    ElMessage.error(e.message);
  }
};

defineExpose({
  dialogVisible
});

onMounted(() => {
  handleMenus();
});
</script>

<style lang="scss" scoped></style>
