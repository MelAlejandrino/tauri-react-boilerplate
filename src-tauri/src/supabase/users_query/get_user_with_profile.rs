use crate::supabase::models::UserFinal;
use crate::supabase::Supabase;

impl Supabase {
    pub async fn get_user_with_profile(&self, token: &str) -> Result<UserFinal, String> {
        let user = self.get_user(token).await?;

        let profile_opt = self.get_profile(token).await?;

        let profile = profile_opt.ok_or_else(|| "User profile not found".to_string())?;

        Ok(UserFinal {
            id: user.id,
            email: user.email,
            full_name: profile.full_name,
        })
    }
}
