import { useEffect, useState } from "react";

export interface TeamMember {
  id: string;
  firstName: string;
  lastName?: string;
  profilePicture?: string;
  coins?: number;
  level?: number;
  experience?: number;
  nationality?: string;
}
export function useTeamMembers(teamId: string) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamId) return;

    fetch(`${import.meta.env.VITE_BACKEND_URL}/employees/by-team/${teamId}`)
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error("Error al cargar miembros del equipo:", err))
      .finally(() => setLoading(false));
  }, [teamId]);

  return { members, loading };
}
