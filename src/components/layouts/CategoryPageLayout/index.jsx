import { Outlet } from "react-router-dom";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Tabs from "../../components/Tabs";
import AdminBreadcrumbs from "../../components/admin/AdminBreadcrumbs";
import { pagePaths } from "../../utils/constants/constant";
import styles from "./styles.module.scss";

const tabs = [
  {
    label: "Category",
    path: pagePaths.adminCategories,
    id: pagePaths.adminCategories,
  },
  {
    label: "Sub Category",
    path: pagePaths.adminSubCategory,
    id: pagePaths.adminSubCategory,
  },
  {
    label: "Sub Sub Category",
    path: pagePaths.adminSubSubCategory,
    id: pagePaths.adminSubSubCategory,
  },
  // {
  //   label: "Sub Sub Sub Category",
  //   path: pagePaths.adminSubSubSubCategory,
  //   id: pagePaths.adminSubSubSubCategory,
  // },
  {
    label: "Article Type Management",
    path: pagePaths.adminArticalType,
    id: pagePaths.adminArticalType,
  },
  {
    label: "Preference Type Management",
    path: pagePaths.adminPreferenceType,
    id: pagePaths.adminPreferenceType,
  },
  // {
  //   label: "Artical Standard Size",
  //   path: pagePaths.adminArticalType,
  //   id: pagePaths.adminArticalType,
  // },
];

const CategoryPageLayout = () => {
  const navigate = useRouter();
  const pathname = usePathname();

  const onTabClick = (tab) => {
    navigate.push(tab.path);
  };

  return (
    <div className={styles.container}>
      {" "}
      <AdminBreadcrumbs
        items={[
          {
            path: pagePaths.adminCategories,
            label: "Categories Management",
          },
        ]}
      />
      <Tabs tabs={tabs} selectedTabId={pathname} onClick={onTabClick} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default CategoryPageLayout;
