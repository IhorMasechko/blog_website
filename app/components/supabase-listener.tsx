"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "./supabase-provider";
import useStore from "../../store";

const SupabaseListener = ({
  serverAccessToken,
}: {
  serverAccessToken?: string;
}) => {
  const router = useRouter();
  const { setUser } = useStore();
  const { supabase } = useSupabase();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email,
        });
      }
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser({ id: session?.user.id, email: session?.user.email });

      if (session?.access_token !== serverAccessToken) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  return null;
};

export default SupabaseListener;
