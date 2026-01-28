pub struct Supabase {
    pub url: String,
    pub anon_key: String,
}

impl Supabase {
    pub fn new(url: impl Into<String>, anon_key: impl Into<String>) -> Self {
        Self {
            url: url.into(),
            anon_key: anon_key.into(),
        }
    }
}
