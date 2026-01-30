use once_cell::sync::Lazy;
use std::env;

pub static CONFIG: Lazy<Config> = Lazy::new(|| Config::new());
pub struct Config {
    pub url: String,
    pub key: String,
    pub jwt_secret: String,
}

impl Config {
    pub fn new() -> Self {
        Self {
            url: env::var("SUPABASE_URL").expect("SUPABASE_URL missing"),
            key: env::var("SUPABASE_ANON_KEY").expect("SUPABASE_ANON_KEY missing"),
            jwt_secret: env::var("SUPABASE_JWT_SECRET").expect("SUPABASE_JWT_SECRET missing"),
        }
    }

    pub fn url(&self) -> &str {
        &self.url
    }

    pub fn key(&self) -> &str {
        &self.key
    }

    pub fn jwt_secret(&self) -> &str {
        &self.jwt_secret
    }
}
