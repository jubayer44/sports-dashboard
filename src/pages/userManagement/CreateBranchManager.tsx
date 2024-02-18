import { Button } from "antd";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import ProductInput from "../../components/product/ProductInput";
import { useAddBranchManagerMutation } from "../../redux/features/userManagement/userManagementApi";
import { branchOptions } from "../../utils/userManagementUtils";

const CreateBranchManager = () => {
  const methods = useForm();
  const [addBranchManager] = useAddBranchManagerMutation();

  const handleRegister = async (data: FieldValues) => {
    const toastId = toast.loading("Registering...");

    if (!data?.branch) {
      toast.error("Please select a branch", { id: toastId });
      return;
    }

    data.role = "branchManager";

    try {
      await addBranchManager({
        name: data?.name,
        email: data?.email,
        password: data?.password,
        branch: data?.branch,
        role: data?.role,
      });

      toast.success("Manager Registered successfully", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md rounded-md border border-neutral-500 p-5 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-600 text-center mb-3 font-sans">
          Create a Branch Manager
        </h2>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleRegister)}>
              <ProductInput type="text" name="name" label="Name" required />
              <ProductInput type="email" name="email" label="Email" required />
              <ProductInput
                type="password"
                name="password"
                label="Password"
                required
              />
              <ProductInput
                type="select"
                name="branch"
                label="Branch"
                required
                options={branchOptions}
              />
              <Button
                type="primary"
                className="bg-blue-500 w-full"
                htmlType="submit"
              >
                Register
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateBranchManager;
