// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import {
//   SidebarGroup,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import { AppSearchForm } from "@/components/app-search-form/AppSearchForm";
// import { SpaceDto } from "@/dto/spaceDto";
// import { isSpaceActive } from "@/utils/sidebar-utils";
// import { useSpaceStore } from "@/app/store/useSpaceStore";

// export function FollowingSpaces() {
//   const { followingSpaces, fetchFollowingSpaces } = useSpaceStore();
//   const [filteredSpaces, setFilteredSpaces] = useState<SpaceDto[]>([]);
//   const pathname = usePathname();

//   useEffect(() => {
//     fetchFollowingSpaces();
//   }, [fetchFollowingSpaces]);

//   useEffect(() => {
//     setFilteredSpaces(followingSpaces);
//   }, [followingSpaces]);

//   const handleSearch = (query: string) => {
//     const q = query.trim().toLowerCase();
//     if (!q) {
//       setFilteredSpaces(followingSpaces);
//       return;
//     }

//     const result = followingSpaces.filter((space) =>
//       space.name.toLowerCase().includes(q)
//     );
//     setFilteredSpaces(result);
//   };

//   return (
//     <SidebarGroup className="overflow-auto group-data-[collapsible=icon]:hidden">
//       <hr className="mb-4 border-black border-t-2" />
//       <p className="ps-2 pt-2 text-xs text-muted-foreground">
//         Following Spaces
//       </p>
//       <AppSearchForm onSearch={handleSearch} />
//       <SidebarMenu className="overflow-y-auto mt-2">
//         {filteredSpaces.length > 0 ? (
//           filteredSpaces.map((space) => (
//             <SidebarMenuItem key={space.id}>
//               <SidebarMenuButton
//                 asChild
//                 className={cn(
//                   "flex justify-between items-center w-full hover:bg-white",
//                   "data-[active=true]:bg-black"
//                 )}
//                 isActive={isSpaceActive(pathname, space.slug)}
//               >
//                 <Link href={`/space/${space.slug}`}>
//                   <span
//                     className={
//                       isSpaceActive(pathname, space.slug)
//                         ? "text-white"
//                         : undefined
//                     }
//                   >
//                     {space.name}
//                   </span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))
//         ) : (
//           <SidebarMenuItem>
//             <div className="px-2 py-1 text-sm text-muted-foreground">
//               No spaces found
//             </div>
//           </SidebarMenuItem>
//         )}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }
