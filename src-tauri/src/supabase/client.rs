use postgrest::Postgrest;
use reqwest::Client;

pub struct Supabase {
    pub url: String,
    pub anon_key: String,
    pub auth_client: reqwest::Client,
    pub db: postgrest::Postgrest,
}

impl Supabase {
    pub fn new(url: String, anon_key: String) -> Self {
        let rest_url = format!("{}/rest/v1", url.trim_end_matches('/'));
        let db = Postgrest::new(&rest_url.to_string()).insert_header("apikey", &anon_key);

        Self {
            url,
            anon_key,
            auth_client: Client::new(),
            db,
        }
    }
}
