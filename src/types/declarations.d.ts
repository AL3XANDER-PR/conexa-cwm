declare module '../aws-exports' {
  const awsmobile: {
    aws_project_region: string;
    aws_cognito_identity_pool_id: string;
    aws_cognito_region: string;
    aws_user_pools_id: string;
    aws_user_pools_web_client_id: string;
    oauth: object;
    aws_user_files_s3_bucket: string;
    aws_user_files_s3_bucket_region: string;
  };
  export default awsmobile;
}
