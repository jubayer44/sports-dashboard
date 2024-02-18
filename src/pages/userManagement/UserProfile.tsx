import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "../../redux/features/userManagement/userManagementApi";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyJwt";

const UserProfile = () => {
  const token = useAppSelector(selectCurrentToken);
  const userId = verifyToken(token as string) as { id: string };
  const { data } = useGetSingleUserQuery(userId?.id, {
    skip: !userId?.id,
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-center my-5">My Profile</h2>
      <div className="max-w-lg p-4 rounded-md border mx-auto flex flex-col gap-2">
        <p className="text-gray-600 font-semibold text-base">
          Name: <span className="font-bold">{data?.data?.name}</span>
        </p>
        <p className="text-gray-600 font-semibold text-base">
          Email: <span className="font-bold">{data?.data?.email}</span>
        </p>
        <p className="text-gray-600 font-semibold text-base">
          Branch: <span className="font-bold">{data?.data?.branch}</span>
        </p>
        <p className="text-gray-600 font-semibold text-base">
          Status: <span className="font-bold">{data?.data?.role}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
