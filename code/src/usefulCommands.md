these are powershell commands, you can only use them in a powershell terminal

1) get the process that use your port with this command
Get-Process -Id (Get-NetTCPConnection -LocalPort 9999).OwningProcess

2) kill the process
Stop-Process -Id (Get-NetTCPConnection -LocalPort 9999).OwningProcess -Force
