import { Button } from "antd";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import ProductInput from "../../components/product/ProductInput";
import { useAddSellerMutation } from "../../redux/features/userManagement/userManagementApi";
import { branchOptions } from "../../utils/userManagementUtils";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const CreateSeller = () => {
  const methods = useForm();
  const [addSeller] = useAddSellerMutation();

  const user = useAppSelector(selectCurrentUser);

  let branches;
  if (user?.role === "superAdmin") {
    branches = branchOptions;
  } else {
    branches = [
      {
        label: user?.branch,
        value: user?.branch,
      },
    ];
  }

  const handleRegister = async (data: FieldValues) => {
    const toastId = toast.loading("Registering...");

    if (!data?.branch) {
      toast.error("Please select a branch", { id: toastId });
      return;
    }

    data.role = "seller";

    try {
      await addSeller({
        name: data?.name,
        email: data?.email,
        password: data?.password,
        branch: data?.branch,
        role: data?.role,
      });

      toast.success("Seller Registered successfully", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md rounded-md border border-neutral-500 p-5 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-600 text-center mb-3 font-sans">
          Create a Seller
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
                options={branches}
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

export default CreateSeller;
