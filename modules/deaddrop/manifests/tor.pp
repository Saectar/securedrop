class deaddrop::tor{
  apt::key { "tor":
    key        => "886DDD89",
    key_server => "keys.gnupg.net",
  }

  apt::source { "tor":
    location          => "http://deb.torproject.org/torproject.org",
    release           => "precise",
    repos             => "main",
    required_packages => "deb.torproject.org-keyring",
    key               => "886DDD89",
    key_server        => "keys.gnupg.net",
    before            => Package["tor"],
  }

  package { 'tor':
    ensure => "installed",
  }

  file { '/etc/tor/torrc':
    ensure  => file,
    source  => "puppet:///modules/deaddrop/torrc",
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    require => Package["tor"],
  }

  service { 'tor':
    ensure     => running,
    hasrestart => true,
    hasstatus  => true,
    subscribe  => File['/etc/tor/torrc'],
    require    => Package['tor'],
  }

  exec { 'passwd -l debian-tor':
    path    => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ],
    user    => 'root',
    group   => 'root',
    require => Package["tor"],
  }
}