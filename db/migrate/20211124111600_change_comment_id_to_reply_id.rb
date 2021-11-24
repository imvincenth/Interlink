class ChangeCommentIdToReplyId < ActiveRecord::Migration[5.2]
  def change
    rename_column :comments, :comment_id, :reply_id
  end
end
