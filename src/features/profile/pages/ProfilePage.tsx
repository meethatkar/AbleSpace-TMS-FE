"use client";
import React, { useState } from "react";
import ProfileItem from "../component/ProfileList";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/root.store";
import Image from "next/image";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ProfilePage = observer(() => {
  const { authStore } = useStore();
  const user = authStore.user;
  const { getUser, updateUserEmail } = useAuth();

  // Since user might be null initially if data hasn't loaded
  const [email, setEmail] = useState(user?.email || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const cancelEmailEdit = () => {
    setIsEditingEmail(false);
    if (user) {
      setEmail(user.email);
    }
  };

  const handleEmailKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditingEmail(false);
      await updateUserEmail(email);
    } else if (e.key === "Escape") {
      cancelEmailEdit();
    }
  };

  // Update local email state if user email changes (e.g. after fetch)
  React.useEffect(() => {
    if (user) {
      setEmail(user.email);
    } else {
      getUser();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex-1 w-full p-4 sm:p-8 flex items-center justify-center">
        <span className="text-subtle-text">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full p-4 sm:p-8 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto space-y-10 mt-6">
        <section>
          <h2 className="text-2xl font-medium mb-4 text-foreground">Profile</h2>
          <div className="bg-background border border-base-border rounded-xl p-2 px-6 shadow-sm">
            <ProfileItem label="Profile picture">
              <div className="flex justify-end w-full">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-base-border bg-sidebar-accent">
                  <Image
                    width={200}
                    height={200}
                    priority
                    src={user.profileImg!}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ProfileItem>

            <ProfileItem label="Email">
              <div className="flex items-center justify-end w-full gap-3 group">
                {isEditingEmail ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent border-b border-foreground focus:outline-none text-sm px-1 py-1"
                      autoFocus
                      onKeyDown={handleEmailKeyDown}
                      onBlur={cancelEmailEdit}
                    />
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-medium text-foreground">
                      {email}
                    </span>
                    <Button
                      variant="ghost"
                      onClick={() => setIsEditingEmail(true)}
                      title="Edit Email"
                      className="px-2 py-1 h-auto"
                    >
                      <PenLine size={16} />
                    </Button>
                  </>
                )}
              </div>
            </ProfileItem>

            {[
              { label: "Full name", value: user.fullName },
              {
                label: "Title",
                description: "Your job title or role",
                value: user.role,
              },
              {
                label: "Username",
                description: "One word, like a nickname or first name",
                value: user.username,
                borderBottom: false,
              },
            ].map((item, index) => (
              <ProfileItem
                key={index}
                label={item.label}
                description={item.description}
                borderBottom={item.borderBottom}
              >
                <div className="w-full bg-sidebar-accent border border-transparent rounded-lg px-3 py-2 text-sm text-subtle-text cursor-not-allowed">
                  {item.value}
                </div>
              </ProfileItem>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-4 text-foreground">
            Workspace access
          </h2>
          <div className="bg-background border border-base-border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-sm text-subtle-text">
              Remove yourself from the workspace
            </span>
            <Button variant="destructive" onClick={() => {}}>
              Leave Workspace
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
});

export default ProfilePage;
