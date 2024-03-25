<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="state.title"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="120px"
        :model="state.form"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="父名称" v-if="props.pidName">
          {{ props.pidName }}
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="state.form.name" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="state.form.path" />
        </el-form-item>
        <el-form-item label="序号" prop="sort">
          <el-input-number v-model="state.form.sort" />
        </el-form-item>

        <el-form-item label="资源">
          <el-table
            ref="multipleTableRef"
            :data="resources"
            style="width: 100%"
            height="450"
            size="small"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column property="name" label="资源名称" />
            <el-table-column property="method" label="方法" />
            <el-table-column property="path" label="路径" />
          </el-table>
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
import { Menu, getMenu, editMenu, addMenu, getMenuResources } from "@/api/menu";
import { Resource, getResources } from "@/api/resource";
import { FormInstance, FormRules, ElMessage } from "element-plus";
const props = defineProps({
  id: String,
  pid: String,
  pidName: String
});
const emits = defineEmits(["close"]);

const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  name: [{ required: true, message: "名称 必填", trigger: "blur" }],
  path: [{ required: true, message: "路径 必填", trigger: "blur" }],
  sort: [{ required: true, message: "序号 必填", trigger: "blur" }]
});

const dialogVisible = ref(false);
const state = reactive({
  title: "",
  form: {
    id: "",
    pid: "",
    name: "",
    path: "",
    sort: 0,
    resourceIds: []
  } as Menu
});
const multipleTableRef = ref();
const resources = ref<Resource[]>([]);

watch(
  () => dialogVisible.value,
  v => {
    if (v) {
      nextTick(() => {
        multipleTableRef.value.clearSelection();
        if (props.id) {
          state.form = {
            id: props.id
          };
          state.title = "修改";
          handleGet(props.id);
        } else if (props.pid) {
          state.title = "新增";
          state.form = {
            pid: props.pid
          };
        } else {
          state.title = "新增";
          state.form = {};
        }
      });
    }
  }
);

const handleGet = async (id: string) => {
  try {
    state.form = await getMenu(id);
    const resourceIds = await getMenuResources(id);
    for (const r of resources.value) {
      const i = resourceIds.find(i => i == r.id);
      if (i) {
        multipleTableRef.value.toggleRowSelection(r, true);
      }
    }
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const saveOrUpdate = async () => {
  const check = await formRef.value.validate();
  if (!check) return;

  state.form.resourceIds = multipleTableRef.value
    .getSelectionRows()
    .map(i => i.id);
  try {
    if (props.id) {
      await editMenu(props.id, state.form);
    } else {
      await addMenu(state.form);
    }
    emits("close");
    dialogVisible.value = false;
  } catch (e) {
    ElMessage.error(e.message);
  }
};

const handleGetResources = async () => {
  try {
    resources.value = await getResources();
  } catch (e) {
    ElMessage.error(e.message);
  }
};

defineExpose({
  dialogVisible
});

onMounted(() => {
  handleGetResources();
});
</script>

<style lang="scss" scoped></style>
